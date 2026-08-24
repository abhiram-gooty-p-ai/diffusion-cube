'use client';

import { useRouter } from 'next/navigation';
import ContributorRegistrationGate from '@/components/ContributorRegistrationGate';

interface Props {
  userId: string;
  userName: string;
  userEmail: string;
  userOrganisation: string;
}

export default function ContributeAccessGate({ userId, userName, userEmail, userOrganisation }: Props) {
  const router = useRouter();
  return (
    <ContributorRegistrationGate
      userId={userId}
      userName={userName}
      userEmail={userEmail}
      userOrganisation={userOrganisation}
      onRegistered={() => router.refresh()}
    />
  );
}
