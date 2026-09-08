"use client";

import { useCallback, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { getCroppedImageFile } from "@/src/lib/image-crop";

export default function ImageCropDialog({
  open,
  onOpenChange,
  imageSrc,
  aspect = 16 / 9,
  fileName = "cover.jpg",
  onCropped,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string | null;
  aspect?: number;
  fileName?: string;
  onCropped: (file: File) => void;
}) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  function reset() {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  }

  async function handleConfirm() {
    if (!imageSrc || !croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const file = await getCroppedImageFile(
        imageSrc,
        croppedAreaPixels,
        fileName
      );
      onCropped(file);
      reset();
      onOpenChange(false);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <DialogContent className="w-full max-w-lg overflow-hidden p-0 sm:max-w-lg">
        <DialogTitle className="px-4 pt-4 text-base font-semibold text-[#1E293B]">
          Cắt ảnh đại diện
        </DialogTitle>

        <div className="relative h-80 w-full overflow-hidden bg-black/80">
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          )}
        </div>

        <div className="flex items-center gap-3 px-4">
          <span className="text-xs whitespace-nowrap text-[#64748B]">
            Thu phóng
          </span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
            className="w-full flex-1"
          />
        </div>

        <DialogFooter className="mx-0 mb-0 mt-2 bg-[#F8FAFC]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex h-9.5 items-center justify-center rounded-lg border border-[#CBD5E1] bg-white px-4 text-sm font-medium text-[#334155] hover:bg-[#F8FAFC]"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!croppedAreaPixels || isProcessing}
            className="flex h-9.5 items-center justify-center rounded-lg bg-[#2563EB] px-4 text-sm font-medium text-white hover:bg-[#2563EB]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isProcessing ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
