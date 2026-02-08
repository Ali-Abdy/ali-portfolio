type ProjectCardProps = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
};

export default function ProjectCard({
  title,
  description,
  tech,
  github,
  live,
}: ProjectCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 transition hover:shadow-sm">
      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tech.map((item) => (
          <span
            key={item}
            className="rounded-full bg-gray-100 dark:bg-gray-900 px-3 py-1 text-xs text-gray-700 dark:text-gray-300"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex gap-4 text-sm font-medium">
        <a
          href={github}
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          GitHub
        </a>

        {live && (
          <a
            href={live}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Live
          </a>
        )}
      </div>
    </div>
  );
}
