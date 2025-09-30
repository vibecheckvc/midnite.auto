'use client';

type Post = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
};

type PostsFeedProps = {
  posts: Post[];
};

export default function PostsFeed({ posts }: PostsFeedProps) {
  if (!posts || posts.length === 0) {
    return <p className="text-gray-400">No posts yet. Start building!</p>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-black/60 backdrop-blur border border-red-700/40 rounded-xl shadow-md shadow-red-900/40 overflow-hidden"
        >
          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-60 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white">{post.title}</h3>
            {post.description && (
              <p className="text-sm text-gray-400 mt-2">{post.description}</p>
            )}
            <p className="text-xs text-gray-500 mt-3">
              {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
