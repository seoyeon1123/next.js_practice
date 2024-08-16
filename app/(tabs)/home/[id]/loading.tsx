export default function Loading() {
  return (
    <>
      <div className="animate-pulse m-2">
        <div className="w-full h-[468px] bg-neutral-300" />
        <div className="flex flex-row justify-between mt-2">
          <div className="flex flex-row gap-3">
            <div className="size-8 rounded-full bg-neutral-300" />
            <div className="size-8 rounded-full bg-neutral-300" />
            <div className="size-8 rounded-full bg-neutral-300" />
          </div>
          <div className="size-8 rounded-full bg-neutral-300" />
        </div>
        <div className="w-40 h-3 bg-neutral-300 rounded-lg mt-2" />
        <div className="w-20 h-3 bg-neutral-300 rounded-lg mt-2" />
        <div className="w-10 h-3 bg-neutral-300 rounded-lg mt-2" />
      </div>
    </>
  );
}
