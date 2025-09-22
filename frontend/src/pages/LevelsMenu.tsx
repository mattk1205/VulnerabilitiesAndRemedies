import LevelButton from "../components/ui/LevelButton.tsx";
import { levelsInfo } from "../services/levelsData.ts";
import Layout from "../layouts/Layout.tsx";

export default function LevelsMenu() {
  return (
    <Layout className="" showNav={true}>
      <h1
        className="text-[rgb(136,136,136)] text-4xl my-10 text-center"
      >
        Select A Level
      </h1>

      <div className="glass-container">
        <p className="text-center text-gray-300 mb-8 text-lg">
          Choose your cybersecurity challenge. Each level tests different
          vulnerabilities and defense strategies.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-6 p-8 transition-all duration-500 justify-items-center">
          {levelsInfo.map((level) => (
            <LevelButton
              available={level.available}
              description={level.description}
              number={level.number}
              key={level.number}
              enemies={level.enemies}
              type={level.type}
            />
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>💡 Complete levels in order to unlock new challenges</p>
        </div>
      </div>
    </Layout>
  );
}