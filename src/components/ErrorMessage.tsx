
export default function ErrorMessage({children}: {children: React.ReactNode}) {
  return (
    <div className="text-center w-full text-white bg-red-600 p-3 rounded-md text-xl mb-5">
      {children}
    </div>
  )
}
