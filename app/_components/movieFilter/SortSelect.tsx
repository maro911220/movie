import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption, SORT_OPTIONS } from "@/types/movie";

// SortSelect Props
interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

// SortSelect
export const SortSelect = ({ value, onChange }: SortSelectProps) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">정렬</h4>
      <Select
        onValueChange={(value) => onChange(value as SortOption)}
        value={value}
      >
        <SelectTrigger className="w-full bg-background/80 cursor-pointer">
          <SelectValue placeholder="정렬 방식 선택" />
        </SelectTrigger>
        <SelectContent position="popper" side="top" align="start">
          {Object.entries(SORT_OPTIONS).map(([key, label]) => (
            <SelectItem key={key} value={key} className="cursor-pointer">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
