import { cn } from "@/lib/utils";
import { IconBulb, IconClock, IconFileSmile, IconFire, IconFlame } from "@tabler/icons-react";


export function AboutUs() {
  const aboutUsFeatures = [
    {
      title: "Passion for Cooking",
      description:
        "At Cookly, we are dedicated to transforming cooking into a delightful and effortless experience. Our passion is to inspire culinary creativity for every individual.",
      icon: <IconFlame />,
    },
    {
      title: "Simplifying Mealtime",
      description:
        "Our mission is to simplify your cooking journey with personalized recipes, smart planning tools, and innovative features that save time and effort.",
      icon: <IconClock />,
    },
    {
      title: "Culinary Innovation",
      description:
        "We are a team of food enthusiasts and tech experts, working together to bring cutting-edge solutions to your kitchen.",
      icon: <IconBulb />,
    },
    {
      title: "Focused on You",
      description:
        "Our user-first approach ensures that we deliver intuitive features, exceptional support, and an evolving platform tailored to your needs.",
      icon: <IconFileSmile />,
    },
  ];
  
      
      
  return (
    <>
    <div id="about" className="py-8 ">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
            About Us
        </h4>

        <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          At Cookly, our mission is to revolutionize the way you approach cooking. With our smart tools and personalized recipes, we transform everyday meals into delightful culinary adventures. Whether you're a home cook, a foodie, or just starting your kitchen journey, Cookly inspires you to create, explore, and savor every moment.
        </p>
    </div>
    (<div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-6 max-w-7xl mx-auto">
      {aboutUsFeatures.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>)
    </>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index
}) => {
  return (
    (<div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}>
      {index < 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div
        className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div
          className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span
          className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p
        className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>)
  );
};
