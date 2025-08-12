"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ChangeEvent } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.replace(newPath);
  };

  return (
    <select
      onChange={handleChange}
      defaultValue={locale}
      className="bg-transparent p-2 rounded-md border border-white/30 text-foreground"
    >
      <option value="en" className="text-black">
        English
      </option>
      <option value="fa" className="text-black">
        فارسی
      </option>
    </select>
  );
}
