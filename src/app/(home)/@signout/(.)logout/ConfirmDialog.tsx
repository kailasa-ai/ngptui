"use client";

import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@/components/alert-dialog";

const ConfirmDialog = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const onDismiss = () => {
    router.back();
  };

  return (
    <AlertDialog defaultOpen>
      <AlertDialogPortal>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onDismiss}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500" asChild>
              {children}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};

export default ConfirmDialog;
