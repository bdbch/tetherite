export default function DemoLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-dvh w-full bg-neutral-200 flex justify-center items-center">
      <div className="w-full max-w-xl p-6 rounded-xl border border-neutral-300 shadow bg-white">
        {children}
      </div>
    </div>
  )
}