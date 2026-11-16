'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, Globe } from 'lucide-react';
import { getCurrentLanguage, setLanguageWithCookie, ensureTranslation } from '../../app/utils/googleTranslateHelper';
import { requestGoogleTranslate } from '@/components/GoogleTranslateRuntime';

// Define TypeScript interfaces
interface LanguageData {
  code: string;
  name: string;
  flag: string;
  countryCode?: string;
}

type LanguageMappingType = {
  [countryCode: string]: LanguageData;
};

// Sample language mapping
const languageMapping: LanguageMappingType = {
  'US': { code: 'en', name: 'English', flag: '🇺🇸' },
  'AE': { code: 'ar', name: 'Arabic', flag: '🇦🇪' },
  'ES': { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  'FR': { code: 'fr', name: 'French', flag: '🇫🇷' },
  'DE': { code: 'de', name: 'German', flag: '🇩🇪' },
  'IT': { code: 'it', name: 'Italian', flag: '🇮🇹' },
  'JP': { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  'KR': { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  'CN': { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' },
  'TW': { code: 'zh-TW', name: 'Chinese (Traditional)', flag: '🇹🇼' },
  'PT': { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  'RU': { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  'IN': { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
};

// Process language data for dropdown - remove duplicates based on language name
const processLanguagesForDropdown = (): LanguageData[] => {
  // Create a map to store unique languages based on language code
  const uniqueLanguages = new Map<string, LanguageData>();
  
  // Process each language entry
  Object.entries(languageMapping).forEach(([countryCode, language]) => {
    // Special case for English - always use US flag
    if (language.code === 'en') {
      language.flag = '🇺🇸';
      // Store country code for reference
      language.countryCode = countryCode;
      
      // Set English from US as the standard English
      if (countryCode === 'US') {
        uniqueLanguages.set(language.code, language);
      }
    } 
    // For all other languages
    else if (!uniqueLanguages.has(language.code)) {
      // Store country code for reference
      language.countryCode = countryCode;
      uniqueLanguages.set(language.code, language);
    }
  });
  
  // Convert map back to array and sort alphabetically by language name
  return Array.from(uniqueLanguages.values())
    .sort((a, b) => a.name.localeCompare(b.name));
};

// Get processed languages list
const allUniqueLanguages = processLanguagesForDropdown();

const TranslateButton = ({ dark = false, landing = false }: { dark?: boolean; landing?: boolean }) => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageData>(() => {
    // We'll initialize this in useEffect to avoid SSR issues
    return languageMapping['US'] || { code: 'en', name: 'English', flag: '🇺🇸', countryCode: 'US' };
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredLanguages, setFilteredLanguages] = useState<LanguageData[]>(allUniqueLanguages);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  
  // Initialize selected language from cookies or localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Clean up URL hash if present
      if (window.location.hash.includes('googtrans')) {
        // Remove hash without page refresh
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      
      // Get current language
      const currentLangCode = getCurrentLanguage();
      if (currentLangCode) {
        const langObj = allUniqueLanguages.find(lang => lang.code === currentLangCode);
        if (langObj) {
          setSelectedLanguage(langObj);
        }
      }
      
      if (currentLangCode && currentLangCode !== 'en') {
        requestGoogleTranslate();
        ensureTranslation();
      }
    }
  }, []);
  
  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter languages based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLanguages(allUniqueLanguages);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = allUniqueLanguages.filter(lang => 
        lang.name.toLowerCase().includes(query) || 
        lang.code.toLowerCase().includes(query)
      );
      setFilteredLanguages(filtered);
    }
  }, [searchQuery]);

  // Handle language selection
  const translatePage = (language: LanguageData) => {
    // Update the selected language in state
    setSelectedLanguage(language);
    
    // Use the cookie-based approach from our helper
    setLanguageWithCookie(language.code);
    
    // Close dropdown and clear search
    setDropdownOpen(false);
    setSearchQuery('');
    
    // Remove hash from URL if present (without page refresh)
    if (window.location.hash.includes('googtrans')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    // refresh website
    window.location.reload();
  };

  // This ensures that Google Translate doesn't translate our dropdown text
  const preventTranslation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.setAttribute('translate', 'no');
    e.currentTarget.classList.add('notranslate');
  };

  return (
    <div className="relative notranslate" translate="no" ref={dropdownRef} onClick={preventTranslation}>
      <button 
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        data-landing-language-trigger={landing ? '' : undefined}
        className={landing
          ? dark
            ? 'relative inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.055] px-3 py-2 text-[12px] font-medium text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-xl transition-colors hover:border-white/25 hover:bg-white/10 sm:gap-2 sm:px-4 sm:text-[13px]'
            : 'relative inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white/85 px-3 py-2 text-[12px] font-medium text-slate-800 shadow-[0_3px_10px_rgba(15,23,42,.05)] backdrop-blur-xl transition-colors hover:border-slate-400 hover:bg-white sm:gap-2 sm:px-4 sm:text-[13px]'
          : dark
            ? 'relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.055] px-4 py-2 text-[13px] font-medium text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-xl transition-colors hover:border-white/25 hover:bg-white/10'
            : 'font-medium text-slate-900 hover:text-emerald-600 px-4 py-3 flex items-center transition duration-150 ease-in-out relative group'}
        aria-label="Select language"
      >
        {dark || landing ? <Globe className={`h-4 w-4 ${dark ? '' : 'text-slate-600'}`} aria-hidden /> : null}
        <span className={dark || landing ? 'inline-flex items-center gap-1.5' : 'relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-emerald-600 group-hover:after:w-full after:transition-all after:duration-300 flex items-center'}>
          {!dark && !landing ? <span className="mr-1 opacity-80">{selectedLanguage.flag}</span> : null}
          <span className={dark || landing ? '' : 'mr-1'}>{selectedLanguage.code.toUpperCase()}</span>
        </span>
        {dark || landing ? <ChevronDown className={`h-3.5 w-3.5 transition-transform ${dark ? 'text-white/55' : 'text-slate-500'} ${dropdownOpen ? 'rotate-180' : ''}`} aria-hidden /> : null}
      </button>
      
      {dropdownOpen && (
        <div className={`absolute right-0 top-full z-50 mt-2 max-h-[28rem] w-64 overflow-y-auto notranslate ${dark ? 'rounded-2xl border border-white/10 bg-[#17171c]/95 text-white shadow-[0_24px_80px_rgba(0,0,0,.5)] ring-1 ring-white/[0.04] backdrop-blur-2xl' : 'rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'}`} translate="no">
          <div className="py-1">
            <div className={`flex items-center justify-between border-b px-4 py-2 text-xs ${dark ? 'border-white/10 text-white/55' : 'border-gray-100 text-gray-500'}`}>
              <span>Select language</span>
              <span className={`text-xs ${dark ? 'text-white/35' : 'text-gray-400'}`}>{filteredLanguages.length} languages</span>
            </div>

            {/* Search input */}
            <div className={`border-b px-3 py-2 ${dark ? 'border-white/10' : 'border-gray-100'}`}>
              <input
                type="text"
                className={`w-full rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${dark ? 'border-white/10 bg-white/[0.06] text-white placeholder:text-white/35' : ''}`}
                placeholder="Search languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Language list */}
            <div className="max-h-80 overflow-y-auto">
              {filteredLanguages.length === 0 ? (
                <div className={`px-4 py-2 text-sm italic ${dark ? 'text-white/50' : 'text-gray-500'}`}>
                  No languages found
                </div>
              ) : (
                filteredLanguages.map((language) => (
                  <button 
                    key={language.code}
                    onClick={() => translatePage(language)}
                    className={`flex w-full items-center px-4 py-2 text-left text-sm ${
                      selectedLanguage.code === language.code
                        ? dark ? 'bg-white/10 text-emerald-200' : 'bg-emerald-50 text-emerald-700'
                        : dark ? 'text-white/80 hover:bg-white/[0.07] hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-2 opacity-70">{language.flag}</span> 
                    <span>{language.name}</span>
                    <span className={`ml-2 text-xs ${dark ? 'text-white/35' : 'text-gray-400'}`}>
                      {language.code}
                    </span>
                    {selectedLanguage.code === language.code && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslateButton;
