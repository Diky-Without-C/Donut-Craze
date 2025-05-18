export default function Loader() {
  return (
    <div className="relative flex size-32 items-center justify-center overflow-hidden">
      <div className="relative z-10 flex size-32 items-center justify-center overflow-hidden rounded-full border border-black bg-[#ffc798] before:absolute before:z-20 before:size-12 before:rounded-full before:border before:border-black before:bg-slate-200 before:content-[''] after:absolute after:z-10 after:size-28 after:-translate-y-1 after:rounded-full after:bg-[#dc9a60] after:content-['']"></div>
      <div className="loader-bite-1 absolute -left-8 -top-12 z-40 size-28 rounded-full bg-slate-200"></div>
      <div className="loader-bite-2 absolute -right-5 -top-10 z-40 size-24 rounded-full bg-slate-200"></div>
      <div className="loader-bite-3 absolute -bottom-4 -right-9 z-40 size-28 rounded-full bg-slate-200"></div>
      <div className="loader-bite-4 absolute -bottom-8 -left-8 z-40 size-28 rounded-full bg-slate-200"></div>
    </div>
  );
}
