
import { Admin, Project, ProjectType } from './types';

export const ADMINS: Admin[] = [
  {
    id: 'silverhold-1',
    username: 'Silverhold',
    name: 'SilverHold Official',
    role: 'Admin',
    quote: 'Jangan lupa sholat walaupun kamu seorang pendosa, Allah lebih suka orang pendosa yang sering bertaubat daripada orang yang merasa suci',
    hashtags: ['#bismillahcalonustad'],
    photoUrl: 'https://picsum.photos/id/64/400/400',
    password: 'Rian'
  },
  {
    id: 'brayn-1',
    username: 'BraynOfficial',
    name: 'Brayn Official',
    role: 'Owner',
    quote: 'Tidak Semua Orang Suka Kita Berkembang Pesat!',
    hashtags: ['#backenddev', '#frontenddev', '#BraynOfficial'],
    photoUrl: 'https://picsum.photos/id/91/400/400',
    password: 'Plerr321'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Futuristic React Dashboard',
    language: 'React',
    type: ProjectType.CODE,
    content: `import React from 'react';
const Dashboard = () => {
  return <div className="p-10 bg-black text-red-500">Welcome to CyberHub</div>;
};
export default Dashboard;`,
    notes: 'A high-performance dashboard for monitoring real-time data.',
    previewUrl: 'https://picsum.photos/id/10/800/400',
    likes: 124,
    downloads: 45,
    authorId: 'brayn-1',
    createdAt: Date.now() - 1000 * 60 * 60 * 24
  },
  {
    id: 'p2',
    name: 'Node.js Auth Middleware',
    language: 'Node.js',
    type: ProjectType.CODE,
    content: `const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, 'secret');
    req.user = verified;
    next();
  } catch (err) { res.status(400).send('Invalid Token'); }
};`,
    notes: 'Standard JWT middleware for protected routes.',
    previewUrl: 'https://picsum.photos/id/60/800/400',
    likes: 89,
    downloads: 12,
    authorId: 'silverhold-1',
    createdAt: Date.now() - 1000 * 60 * 60 * 12
  }
];

export const CONFIG = {
  MONGODB_URI: 'mongodb+srv://braynofficial66_db_user:Oh2ivMc2GGP0SbJF@cluster0.zi2ra3a.mongodb.net/website_db',
  CLOUDINARY: {
    cloud_name: 'dnb0q2s2h',
    api_key: '838368993294916',
    api_secret: 'N9U1eFJGKjJ-A8Eo4BTtSCl720c'
  }
};
