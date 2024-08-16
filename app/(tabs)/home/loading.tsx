export default function Loading() {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse border-2 border-neutral-400 flex flex-col rounded-md items-center p-4"
        >
          <div className="w-full h-40 bg-neutral-300 rounded-md mb-2" />
          <div className="w-full">
            <div className="h-4 bg-neutral-300 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
