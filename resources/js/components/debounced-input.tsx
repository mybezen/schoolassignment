// Buat file baru: components/DebouncedInput.tsx
import { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DebouncedInputProps {
    label: string;
    id: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    error?: string;
}

const DebouncedInput = memo(({ label, id, value, onChange, placeholder, type = 'text', error }: DebouncedInputProps) => {
    return (
        <div>
            <Label htmlFor={id} className="text-white">{label} *</Label>
            <Input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
                placeholder={placeholder}
            />
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
    );
});

export default DebouncedInput;