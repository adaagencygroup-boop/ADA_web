"use client";

function formatThousands(digits: string) {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function CurrencyInput({
  value,
  onChange,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const digits = event.target.value.replace(/\D/g, "");
    onChange(digits);
  }

  return (
    <div className="relative">
      <input
        type="text"
        inputMode="numeric"
        value={formatThousands(value)}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className="h-9.5 w-full rounded-lg border border-[#C4C6D2] py-2 pr-14 pl-4 text-sm text-[#1C1B1B] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#316EE9] disabled:cursor-not-allowed disabled:bg-[#F3F4F6] disabled:opacity-60"
      />
      <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-[#434750]">
        VND
      </span>
    </div>
  );
}
