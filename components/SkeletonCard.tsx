// components/SkeletonCard.tsx
'use client';
import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="animate-pulse border rounded-md p-4 flex flex-col space-y-2">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-gray-300 rounded-full dark:bg-gray-700" />
          <div className="h-4 w-24 bg-gray-300 rounded dark:bg-gray-700" />
        </div>
        <div className="h-4 w-16 bg-gray-300 rounded dark:bg-gray-700" />
      </div>
      <div className="h-4 w-full bg-gray-300 rounded dark:bg-gray-700" />
      <div className="h-4 w-10/12 bg-gray-300 rounded dark:bg-gray-700" />
    </div>
  );
}
