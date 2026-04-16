interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
}

export function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 sm:mb-12">
      {badge && (
        <div className="mb-4 inline-block rounded-full border border-[#fbbf24]/30 bg-[#fbbf24]/10 px-4 py-1.5 font-['Nunito'] text-xs sm:text-sm text-[#fbbf24]">
          {badge}
        </div>
      )}
      <h1 className="font-['Press_Start_2P'] text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4 text-white">
        {title}
      </h1>
      {description && (
        <p className="font-['Nunito'] text-base sm:text-lg text-gray-300 max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}