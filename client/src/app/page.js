import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, DollarSign } from "lucide-react"; 
import { Banner } from "@/components/Banner/Banner";


function CampaignList() {

  const items = [
  {
    image: "/cap2.png",
    title: "Medical Support for Children",
    creator: "Dr. Neha Sharma",
    target: 500000,
    raised: 320000,
  },
  {
     image: "/cap2.png",
    title: "Medical Support for Children",
    creator: "Dr. Neha Sharma",
    target: 500000,
    raised: 320000,
  },{
     image: "/cap2.png",
    title: "Medical Support for Children",
    creator: "Dr. Neha Sharma",
    target: 500000,
    raised: 320000,
  },{
     image: "/cap2.png",
    title: "Medical Support for Children",
    creator: "Dr. Neha Sharma",
    target: 500000,
    raised: 320000,
  },{
    image: "/cap2.png",
    title: "Medical Support for Children",
    creator: "Dr. Neha Sharma",
    target: 500000,
    raised: 320000,
  },{
    image: "/cap2.png",
    title: "Medical Support for Children",
    creator: "Dr. Neha Sharma",
    target: 500000,
    raised: 320000,
  },{
     image: "/cap2.png",
    title: "Medical Support for Children",
    creator: "Dr. Neha Sharma",
    target: 500000,
    raised: 320000,
  },{
     image: "/cap2.png",
    title: "Medical Support for Children",
    creator: "Dr. Neha Sharma",
    target: 500000,
    raised: 320000,
  },{
     image: "/cap2.png",
    title: "Medical Support for Children",
    creator: "Dr. Neha Sharma",
    target: 500000,
    raised: 320000,
  },{
    image: "/cap2.png",
    title: "Medical Support for Children",
    creator: "Dr. Neha Sharma",
    target: 500000,
    raised: 320000,
  }
];
  return (
    
    <div className="bg-black min-h-screen">
      <div>
        <Banner title={'Open Campaigns'} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <Card key={index} className="w-full shadow-xl">
              <CardHeader className="p-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={4000}
                  height={400}
                 
                  className="rounded-t-lg  w-full h-72"
                />
              </CardHeader>

              <CardContent className="p-4">
                <h2 className="text-xl font-semibold text-white mb-1">{item.title}</h2>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {item.creator}
                </p>
                <div className="mt-4 flex justify-between text-sm text-gray-300">
                  <div>
                    <p className="font-medium">Target</p>
                    <p>₹ {item.target}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium flex items-center gap-1 justify-end">
                      Raised <DollarSign className="w-4 h-4" />
                    </p>
                    <p>₹ {item.raised}</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed]">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CampaignList;
