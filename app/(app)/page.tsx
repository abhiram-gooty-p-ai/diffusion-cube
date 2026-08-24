import { redirect } from 'next/navigation';

// The landing just routes to the Library — /explore is open to any approved
// user (the layout above this already gates approval), so there's no
// role-based branching left to do here. Strengthen and Contribute are their
// own dedicated entry points, reached from the sidebar.
export default function HomePage() {
  redirect('/explore');
}
