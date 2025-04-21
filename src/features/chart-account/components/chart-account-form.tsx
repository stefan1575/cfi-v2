"use client";

import { createChartAccount } from "@/features/chart-account/mutations/createChartAccount";
import { updateChartAccount } from "@/features/chart-account/mutations/updateChartAccount";
import { ChartAccountSchema } from "@/features/chart-account/schema";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { FormProps } from "@/shared/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type ChartAccountFormFields = z.infer<typeof ChartAccountSchema>;
type ChartAccountFormProps = FormProps<ChartAccountFormFields>;

export function ChartAccountForm({
  mode,
  defaultValues,
  id,
}: ChartAccountFormProps) {
  const form = useForm({
    resolver: zodResolver(ChartAccountSchema),
    defaultValues,
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: create, isPending: isPendingCreate } = useMutation({
    mutationFn: createChartAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chartAccount"] });
      router.push("/dashboard/chart-account");
    },
  });

  const { mutate: update, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateChartAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chartAccount"] });
      router.push("/dashboard/chart-account");
    },
  });

  const onSubmit: SubmitHandler<ChartAccountFormFields> = async (values) => {
    if (mode === "add") {
      create(values);
    } else {
      update({
        where: { id },
        data: values,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-3xl space-y-8 rounded-lg bg-white p-10 shadow-md"
      >
        <div>
          <div className="flex text-xl font-bold">Shipment Form</div>
          <Separator className="mt-2" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  Account Number
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Account Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  Account Name
                </FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Account Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button variant="destructive" className="mr-2 cursor-pointer" asChild>
            <Link href="/dashboard/shipment">Go Back</Link>
          </Button>
          {!isPendingCreate || !isPendingUpdate ? (
            <Button className="cursor-pointer" type="submit">
              Submit
            </Button>
          ) : (
            <Button type="submit" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
