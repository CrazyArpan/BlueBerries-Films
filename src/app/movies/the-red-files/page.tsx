import React from 'react';
import { Metadata } from 'next';
import RedFilesClient from './RedFilesClient';

export const metadata: Metadata = {
  title: 'The Red Files - BlueBerries Films',
  description: 'A gripping thriller from BlueBerries Films. Watch The Red Files, an upcoming Bengali movie from Blueberries Originals.',
};

export default function RedFilesPage() {
  return <RedFilesClient />;
} 