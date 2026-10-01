'use client';

import { useActionState } from 'react';
import { LoaderCircle, LogIn } from 'lucide-react';

import { signIn, type SignInState } from '@/app/admin/actions/auth';
import { Alert, AlertDescription, AlertIcon } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleAlert } from 'lucide-react';

export function LoginForm({ notice }: { notice?: string }) {
  const [state, action, pending] = useActionState<SignInState, FormData>(signIn, {});
  const error = state.error ?? notice;

  return (
    <form action={action} className="mt-8 flex flex-col gap-5">
      {error && (
        <Alert variant="destructive" appearance="light">
          <AlertIcon>
            <CircleAlert />
          </AlertIcon>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required placeholder="vous@exemple.com" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>
      <Button type="submit" size="lg" disabled={pending} className="w-full justify-center">
        {pending ? <LoaderCircle className="animate-spin" /> : <LogIn />}
        Se connecter
      </Button>
    </form>
  );
}
