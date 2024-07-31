import React, { useState, forwardRef } from "react";
import Image from "next/image";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

import { cn } from "../../_utils";
import { ChevronDownIcon } from "lucide-react";

import { Option, SelectorProps } from "./type";

export const Selector = forwardRef(
  <T extends Option>(
    { title, icon, options, defaultValue, onChange }: SelectorProps<T>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const defaultVal = defaultValue ? defaultValue : "";

    const [selectedOption, setSelectedOption] = useState<T | null>(() => {
      if (defaultVal) {
        return (
          options.find(
            (option) => option.name.toLowerCase() === defaultVal.toLowerCase()
          ) || null
        );
      }
      return options[0] || null;
    });

    const [query, setQuery] = useState(defaultVal);

    const filteredOptions =
      query === ""
        ? options
        : options.filter((option) => {
            return option.name.toLowerCase().includes(query.toLowerCase());
          });

    return (
      <div className="flex gap-14">
        <div className="flex items-center gap-4">
          <Image src={icon} alt="time icon" width={24} height={24} />
          <h2 className="text-primary font-inter">{title}</h2>
        </div>
        <div className="w-52 ">
          <Combobox
            value={selectedOption}
            onChange={(newValue) => {
              setSelectedOption(newValue);
              onChange(newValue);
            }}
            onClose={() => setQuery("")}
          >
            <div className="relative">
              <ComboboxInput
                ref={ref}
                aria-label="Assignee"
                className={cn(
                  "w-full rounded-lg border-none focus:bg-zinc-200 py-1.5 pr-8 pl-3 text-sm/6 text-primary",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
                displayValue={(option: T | null) => option?.name || ""}
                onChange={(event) => setQuery(event.target.value)}
              />
              <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
              </ComboboxButton>
            </div>

            <ComboboxOptions
              anchor="bottom"
              className={cn(
                "w-[var(--input-width)] rounded-xl border text-primary  border-white/5 bg-zinc-200 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
                "z-50"
              )}
            >
              {filteredOptions.map((option) => (
                <ComboboxOption
                  key={option.name}
                  value={option}
                  className="group flex cursor-default  items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                >
                  <h3 className="text-sm/6">{option.name}</h3>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Combobox>
        </div>
      </div>
    );
  }
);

Selector.displayName = "Selector";
