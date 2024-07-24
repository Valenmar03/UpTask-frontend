
export default function ErrorMessage({children}: {children: React.ReactNode}) {
  return (
    <div className="text-center w-full text-white bg-red-600 p-2 rounded-md text-lg mb-3">
      {children}
    </div>
  )
}
