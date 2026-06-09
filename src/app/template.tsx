// A template re-mounts on every navigation, so the fade animation replays
// each time the user switches page.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-fade">{children}</div>
}
