const people = [
  {
    name: "Mohsin King",
    role: "B.Tech CSE 4th Year, ALIAH UNIVERSITY",
    imageUrl: "/mohsin.jpeg",
  },
  {
    name: "Sk Asif",
    role: "B.Tech CSE 4th Year, ALIAH UNIVERSITY",
    imageUrl: "/asif.jpeg",
  },
  {
    name: "Md Alif",
    role: "B.Tech CSE 4th Year, ALIAH UNIVERSITY",
    imageUrl: "/alif.jpeg",
  },
];

export default function Example() {
  return (
    <div className="bg-white py-4">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-5">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Who are we ?
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Three of us are final year students of Aliah University, pursuing
              4-year B.Tech in Computer Science and Engineering major. This is
              our final year project on Disease Prediction System under the
              supervision of Prof. Abisekh sir. We have used a Robust Model for
              prediction scenarios and Developed an attractive UI for
              interaction with the model.
            </p>
          </div>
        </div>
      </div>
      <div className="py-16 mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our Team
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We are a team of three final year students. Developed a Disease
            Prediction System under the guidance of Prof. Abisekh Sir.
          </p>
        </div>
        <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  className="h-16 w-16 rounded-full"
                  src={person.imageUrl}
                  alt=""
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
