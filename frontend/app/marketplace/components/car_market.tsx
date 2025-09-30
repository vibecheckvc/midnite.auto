import { Car } from "lucide-react";

export default function CarMarket() {
  const cars = [
    {
      id: 1,
      title: "2020 BMW M3",
      price: "$65,000",
      location: "Toronto, ON",
      image: "/images/bmw.jpg",
    },
    {
      id: 2,
      title: "2018 Honda Civic",
      price: "$18,500",
      location: "Mississauga, ON",
      image: "/images/civic.jpg",
    },
    {
      id: 3,
      title: "2021 Tesla Model 3",
      price: "$48,000",
      location: "Ottawa, ON",
      image: "/images/tesla.jpg",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Car className="w-6 h-6 text-purple-600" /> Car Marketplace
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="border rounded-lg shadow-sm bg-white hover:shadow-md transition cursor-pointer"
          >
            <img
              src={car.image}
              alt={car.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{car.title}</h3>
              <p className="text-purple-600 font-bold">{car.price}</p>
              <p className="text-gray-500 text-sm">{car.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
