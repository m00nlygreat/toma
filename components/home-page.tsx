'use client';

import { Button } from "@/components/ui/button";
import { ContributionHeatmap } from "@/components/ui/contribution-heatmap";
import { FeedItem } from "@/components/ui/feed-item";
import { PomodoroTimer } from "@/components/ui/pomodoro-timer";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

import { ClientToggleSwitch } from "@/components/client-toggle-switch";
import { TaskCard } from "@/components/ui/task-card";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <main className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-headline font-bold">Toma</h1>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="flex items-center space-x-4">
              <p>{user.email}</p>
              <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
            </div>
          ) : (
            <Link href="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-subheadline font-semibold mb-4">My Field</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TaskCard title="Plant tomatoes" dueDate="Aug 25" status="growing" />
            <TaskCard title="Put tomatoes" dueDate="Aug 24" status="waiting" />
            <TaskCard title="Due" status="harvested" harvestedCount={3} />
          </div>

          <div className="mt-8">
            <h2 className="text-subheadline font-semibold mb-4">Feed</h2>
            <div className="space-y-4">
              <FeedItem />
              <FeedItem />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-subheadline font-semibold mb-4">Pomodoro</h2>
            <PomodoroTimer />
          </div>

          <div>
            <h2 className="text-subheadline font-semibold mb-4">Buttons</h2>
            <div className="flex flex-col space-y-2">
              <Button>Primary Button</Button>
              <Button variant="outline">Secondary Button</Button>
              <Button variant="cta">+</Button>
            </div>
          </div>

          <div>
            <h2 className="text-subheadline font-semibold mb-4">Toggle Switch</h2>
            <ClientToggleSwitch />
          </div>

          <div>
            <h2 className="text-subheadline font-semibold mb-4">Contribution</h2>
            <ContributionHeatmap />
          </div>
        </div>
      </div>
    </main>
  );
}
