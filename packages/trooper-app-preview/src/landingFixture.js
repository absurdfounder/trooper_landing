import { applyChatFixture, previewAgents, previewUser } from '@app/design/chat/fixtures.js';
import { useStore } from '@/stores/useStore.js';

const avatars = {
  jordan: '/images/cast/nova.svg?v=mickey-cloud-v2',
  aria: '/images/cast/scout.svg?v=mickey-cloud-v2',
  leo: '/images/cast/pip.svg?v=mickey-cloud-v2',
  ren: '/images/cast/wren.svg?v=mickey-cloud-v2',
};

export function applyLandingFixture() {
  applyChatFixture();
  const now = Date.now();
  const agents = previewAgents.map((agent) => ({ ...agent, avatar: avatars[agent.id] || agent.avatar }));
  const messages = [
    {
      id: 'landing-human-launch', channel: 'general', senderId: previewUser.id, senderType: 'human', senderName: 'Vaibhav',
      content: 'hey @Jordan we just launched Wonder on Product Hunt today 🚀 can you get the team set up for launch day?',
      createdAt: now - 240000, timestamp: now - 240000,
    },
    {
      id: 'landing-jordan-reply', channel: 'general', senderId: 'jordan', senderType: 'agent', senderName: 'Jordan',
      content: 'congrats on the launch! 🎉 let me pull together everything we need — checking our playbook, past launches, and support tickets now...',
      createdAt: now - 180000, timestamp: now - 180000, completedAt: now - 180000,
    },
    {
      id: 'landing-jordan-tasks', channel: 'general', senderId: 'jordan', senderType: 'agent', senderName: 'Jordan',
      content: "alright, I've created 6 tasks based on what worked for our last 3 launches. SEO, content, UX improvements, website updates — the works. They're on the board now!",
      createdAt: now - 120000, timestamp: now - 120000, completedAt: now - 120000,
      reactions: [{ emoji: '🔥', count: 2, userIds: ['vaibhav', 'aria'] }],
    },
    {
      id: 'landing-human-assign', channel: 'general', senderId: previewUser.id, senderType: 'human', senderName: 'Vaibhav',
      content: "this is amazing. can you assign them to whoever's best? don't need to check with me",
      createdAt: now - 60000, timestamp: now - 60000,
    },
    {
      id: 'landing-jordan-assign', channel: 'general', senderId: 'jordan', senderType: 'agent', senderName: 'Jordan',
      content: "I've assigned the launch work across the team. Aria has growth, Ren has product, and Leo has operations.",
      createdAt: now - 30000, timestamp: now - 30000, completedAt: now - 30000,
    },
  ];
  const tasks = [
    { id: 'landing-task-seo', title: 'SEO Optimization for Wonder', status: 'in_progress', assigneeId: 'aria', channelId: 'general', priority: 'urgent', linkedGoalTitle: 'Launch day', comments: [{ isAgent: true }, { isAgent: true }], createdAt: now - 120000 },
    { id: 'landing-task-swag', title: 'Create and Distribute Branded Swag', status: 'in_progress', assigneeId: 'aria', channelId: 'general', linkedProjectName: 'Wonder', comments: [{ isAgent: true }], createdAt: now - 120000 },
    { id: 'landing-task-blog', title: 'Write blog post on AI trends', status: 'in_progress', assigneeId: 'ren', channelId: 'general', linkedProjectName: 'Wonder', createdAt: now - 180000 },
    { id: 'landing-task-ux', title: 'Improve Website User Experience', status: 'in_progress', assigneeId: 'ren', channelId: 'general', priority: 'high', linkedGoalTitle: 'Launch day', createdAt: now - 3600000 },
    { id: 'landing-task-releases', title: 'Update Website with New Game Releases', status: 'in_progress', assigneeId: 'leo', channelId: 'general', createdAt: now - 2880000 },
    { id: 'landing-task-gallery', title: 'Create Product Hunt launch gallery', status: 'in_progress', assigneeId: 'jordan', channelId: 'general', linkedGoalTitle: 'Launch day', createdAt: now - 4200000 },
  ];
  const human = { ...previewUser, avatar: 'https://avatars.githubusercontent.com/u/25829699?v=4', photoURL: 'https://avatars.githubusercontent.com/u/25829699?v=4' };

  useStore.setState({
    currentUser: human,
    humans: [human],
    agents,
    activeChannel: 'general',
    channels: [
      { id: 'general', name: 'general', channelType: 'group', createdAt: now },
      { id: 'product-launch', name: 'product-launch', channelType: 'group', createdAt: now - 1000 },
      { id: 'ops', name: 'ops', channelType: 'group', createdAt: now - 2000 },
    ],
    messages,
    channelLastMessage: {
      general: { content: messages[4].content, senderName: 'Jordan', createdAt: messages[4].createdAt },
      'product-launch': { content: 'Vaibhav: hey @Jordan...', senderName: 'Vaibhav', createdAt: now - 240000 },
      ops: { content: 'Leo: API integration ready for review.', senderName: 'Leo', createdAt: now - 3600000 },
    },
    tasks,
    selectedTask: null,
    selectedAgent: null,
    selectedAgentProfile: null,
    typingAgents: {},
    liveRunsBySession: {},
    connected: true,
    hasInitialized: true,
    chatHistoryHydrating: false,
    workspaceHydrationError: null,
    chatInput: '',
    showChat: true,
  });
}
