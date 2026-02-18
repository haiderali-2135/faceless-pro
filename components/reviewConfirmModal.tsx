"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import creditLogo from "@/assets/modal-coin-stack.svg";
import Image from "next/image";

interface ReviewConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  creditsUsed?: number;
  creditsRemaining?: number;
  onConfirm?: () => void;
}

export function ReviewConfirmModal({
  open,
  onOpenChange,
  creditsUsed = 50,
  creditsRemaining = 20,
  onConfirm,
}: ReviewConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-[#262626] border-[#525252] rounded-3xl   [&>button]:hidden">
        <div className="flex flex-col items-center gap-5 p-6">
          <div className="text-center mb-1">
            <DialogTitle className="text-3xl font-semibold text-foreground mb-1">
              {"Review & Confirm"}
            </DialogTitle>
            <DialogDescription className="text-[#E5E5E5] text-sm">
              Check Credits Before Generating
              <br />
              Your Video.
            </DialogDescription>
          </div>

          <div className="w-full rounded-2xl border border-[#404040] bg-[#363636] py-3 px-1">
            <div className="flex items-stretch">
              <div className="flex-1 flex flex-col items-center gap-3">
                <p className="text-sm text-[#E5E5E5]  text-center leading-tight">
                  This Video Will
                  <br />
                  Use
                </p>
                <div className="flex items-center gap-2 bg-[#404040] border border-[#737373] rounded-xl px-4 py-2">
                  <div className="relative w-5 h-5  ">
                    <Image
                      src={creditLogo}
                      alt="Theme"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-md font-base text-foreground">
                    {creditsUsed} Credits
                  </span>
                </div>
              </div>

              <div className="w-[2px] bg-[#737373] mx-2" />

              <div className="flex-1 flex flex-col items-center gap-3">
                <p className="text-sm text-[#E5E5E5] text-center leading-tight">
                  Credits Remaining
                  <br />
                  After Generation
                </p>

                <div className="flex items-center gap-2 bg-[#404040] border border-[#737373] rounded-xl px-4 py-2">
                  <div className="relative w-5 h-5  ">
                    <Image
                      src={creditLogo}
                      alt="Theme"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-md font-base text-foreground">
                    {creditsRemaining} Credits
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#A1A1A1]  text-center">
            Credits Are Deducted Before Rendering.
          </p>

          <div className="w-full flex flex-col gap-3">
            <Button
              onClick={onConfirm}
              className="w-full h-12 rounded-xl bg-[#00BFCD] text-[#0a0a0a] font-medium text-lg hover:bg-[#00B3C1] transition-colors cursor-pointer"
            >
              Confirm
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full h-12 rounded-xl border-[#9F9FA9] border-[1.5px] bg-transparent text-foreground font-medium text-lg hover:bg-[#222] cursor-pointer"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
