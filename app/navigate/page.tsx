import { redirect } from 'next/navigation';

// This flow was renamed Navigate → Analyse; this old path just forwards any
// existing link or bookmark to the real page at /analyse rather than 404ing.
export default function NavigateRedirect() {
  redirect('/analyse');
}
