import { CreateWorldPost } from "./sections/CreateWorldPost"

export const WorldPostModule = () => {
  return (
    <>
      <section className="flex flex-col">
        <div className="flex flex-col gap-1">
          <h1 className="font-paytone text-lg px-7">Home</h1>
          <hr />
          <CreateWorldPost />
          <hr className="h-2 bg-teal-100 border-none" />
        </div>
      </section>
    </>
  )
}
