"use client";
import { GitHubCalendar } from "react-github-calendar";

export default function GithubGraph({ username = "arshnah" }: { username?: string }) {
  return (
    <div className="overflow-x-auto pb-1 text-muted">
      <GitHubCalendar
        username={username}
        colorScheme="dark"
        blockSize={11}
        blockMargin={4}
        fontSize={12}
        theme={{ dark: ["#141416", "#2c2c2e", "#565658", "#9a9a96", "#f2f2f0"] }}
      />
    </div>
  );
}
