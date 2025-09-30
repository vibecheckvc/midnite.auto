'use client';

type Friend = {
  id: string;
  username: string;
  avatar_url: string | null;
};

type FriendsListProps = {
  friends: Friend[];
};

export default function FriendsList({ friends }: FriendsListProps) {
  if (!friends || friends.length === 0) {
    return <p className="text-gray-400">No friends yet. Start connecting!</p>;
  }

  return (
    <div className="bg-black/60 backdrop-blur border border-purple-600/40 rounded-xl p-4 shadow-md shadow-purple-900/40">
      <h2 className="text-lg font-bold text-purple-400 mb-4">Friends</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-black">
        {friends.map((f) => (
          <div
            key={f.id}
            className="flex flex-col items-center min-w-[80px]"
          >
            <img
              src={f.avatar_url || '/default-avatar.png'}
              alt={f.username}
              className="w-14 h-14 rounded-full border-2 border-purple-600 shadow-md shadow-purple-800/50"
            />
            <p className="text-xs text-gray-300 mt-2 truncate">{f.username}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 text-right">
        <a
          href="/friends"
          className="text-sm font-medium text-purple-400 hover:text-fuchsia-400"
        >
          View All →
        </a>
      </div>
    </div>
  );
}
