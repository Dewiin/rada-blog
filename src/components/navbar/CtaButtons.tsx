import { DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type ctaButtonsProps = {
    setMode: Function,
    signInText: string,
    ctaText: string,
}

export function CtaButtons({ setMode, signInText, ctaText }: ctaButtonsProps) {
    return (
        <>
            <DialogTrigger asChild>
                <Button
                    className="text-sm font-medium px-4 h-9 hover:bg-accent hover:text-accent-foreground"
                    size="sm"
                    variant="ghost"
                    onClick={() => setMode("login")}
                    >
                    {signInText}
                </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
                <Button
                    className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                    size="sm"
                    onClick={() => setMode("signup")}
                    >
                    {ctaText}
                </Button>
            </DialogTrigger>
        </>
    )
}