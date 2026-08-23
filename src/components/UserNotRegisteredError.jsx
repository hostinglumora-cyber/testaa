export default function UserNotRegisteredError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center bg-background text-foreground">
      <h1 className="text-2xl font-bold">Not registered</h1>
      <p className="text-muted-foreground max-w-md">
        Your account is not registered for this app. Please contact the app administrator for access.
      </p>
    </div>
  )
}
