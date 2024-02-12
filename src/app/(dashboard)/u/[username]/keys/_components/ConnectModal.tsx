"use client";

import { useState, useTransition, useRef, ElementRef } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { IngressInput } from "livekit-server-sdk";
import { AlertTriangle } from "lucide-react";
import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  const selectHandler = (value: string) => setIngressType(value);

  const submitHandler = () =>
    startTransition(() => {
      try {
        createIngress(parseInt(ingressType));
        toast.success("Connection generated");
        closeRef.current?.click();
      } catch (error) {
        toast.error("Failed to generate connection");
      }
    });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Generate Connection</Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Connection</DialogTitle>
          </DialogHeader>
          <Select
            disabled={isPending}
            value={ingressType}
            onValueChange={selectHandler}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ingress Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={RTMP}>RTMP</SelectItem>
              <SelectItem value={WHIP}>WHIP</SelectItem>
            </SelectContent>
          </Select>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              This action will reset all active streams using the current
              connection.
            </AlertDescription>
          </Alert>
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button
              onClick={submitHandler}
              disabled={isPending}
              variant="primary"
            >
              Generate
            </Button>
          </div>
        </DialogContent>
      </DialogTrigger>
    </Dialog>
  );
};
