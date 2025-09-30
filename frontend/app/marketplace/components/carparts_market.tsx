import { Wrench } from "lucide-react";

export default function CarPartsMarket() {
  const parts = [
    {
      id: 1,
      title: "Set of 4 Michelin Tires",
      price: "$600",
      location: "Brampton, ON",
      image: "/images/tires.jpg",
    },
    {
      id: 2,
      title: "Brembo Brake Kit",
      price: "$1,200",
      location: "Toronto, ON",
      image: "/images/brakes.jpg",
    },
    {
      id: 3,
      title: "Carbon Fiber Spoiler",
      price: "$350",
      location: "Hamilton, ON",
      image: "/images/spoiler.jpg",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Wrench className="w-6 h-6 text-purple-600" /> Car Parts Marketplace
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {parts.map((part) => (
          <div
            key={part.id}
            className="border rounded-lg shadow-sm bg-white hover:shadow-md transition cursor-pointer"
          >
            <img
              src={part.image}
              alt={part.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{part.title}</h3>
              <p className="text-purple-600 font-bold">{part.price}</p>
              <p className="text-gray-500 text-sm">{part.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
