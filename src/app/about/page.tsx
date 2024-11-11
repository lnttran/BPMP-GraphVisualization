// import { Card, CardContent } from "@/components/ui/card";

// export default function Component() {
//   const team = [
//     {
//       name: "Dr. Eli Olinick",
//       role: "Lead Developer",
//       image: "/placeholder.svg?height=400&width=400",
//     },
//     {
//       name: "Yuanyuan Dong",
//       role: "UX Designer",
//       image: "/placeholder.svg?height=400&wid th=400",
//     },
//     {
//       name: "Daniel Ryan",
//       role: "Data Scientist",
//       image: "/placeholder.svg?height=400&width=400",
//     },
//     {
//       name: "Tran Lam",
//       role: "Backend Engineer",
//       image: "/placeholder.svg?height=400&width=400",
//     },
//     {
//       name: "Sreshta Ghosh",
//       role: "Product Manager",
//       image: "/placeholder.svg?height=400&width=400",
//     },
//   ];

//   return (
//     <div className="relative bg-background h-full">
//       <div className="relative flex flex-col gap-4 h-full items-center">
//         <div className="font-extrabold text-[32px]">Meet Our Team</div>
//         <p className="max-w-[700px] md:text-base/relaxed lg:text-base/relaxed xl:text-md/relaxed text-center">
//           The talented people behind BPMP working to bring you the best route
//           optimization solution.{" "}
//         </p>
//         <div className="flex flex-col gap-4 mt-4 items-center">
//           {/* Top row - 2 people */}
//           <div className="gap-8 flex flex-row">
//             {team.slice(0, 2).map((member) => (
//               <Card
//                 key={member.name}
//                 className="overflow-hidden bg-white border-none"
//               >
//                 <CardContent className="p-0">
//                   <div className="w-80 h-64 relative bg-[#f5f9f7]">
//                     <img
//                       src={member.image}
//                       alt={member.name}
//                       className="object-cover w-full h-full transition-transform hover:scale-105"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <h3 className="text-xl font-semibold">{member.name}</h3>
//                     <p className="text-sm text-gray-500">{member.role}</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//           {/* Bottom row - 3 people */}
//           <div className="gap-8 flex flex-row">
//             {team.slice(2).map((member) => (
//               <Card
//                 key={member.name}
//                 className="overflow-hidden bg-white border-none"
//               >
//                 <CardContent className="p-0">
//                   <div className="w-80 h-64 relative bg-[#f5f9f7]">
//                     <img
//                       src={member.image}
//                       alt={member.name}
//                       className="object-cover w-full h-full transition-transform hover:scale-105"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <h3 className="text-xl font-semibold">{member.name}</h3>
//                     <p className="text-sm text-gray-500">{member.role}</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
