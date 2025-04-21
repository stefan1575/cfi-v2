"use client";

import { createClientMaster } from "@/features/client-master/mutations/createClientMaster";
import { updateClientMaster } from "@/features/client-master/mutations/updateClientMaster";
import { ClientMasterSchema } from "@/features/client-master/schema";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
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

type ClientMasterFormFields = z.infer<typeof ClientMasterSchema>;
type ClientMasterFormProps = FormProps<ClientMasterFormFields>;

export function ClientMasterForm({
  mode,
  defaultValues,
  id,
}: ClientMasterFormProps) {
  const form = useForm({
    resolver: zodResolver(ClientMasterSchema),
    defaultValues,
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: create, isPending: isPendingCreate } = useMutation({
    mutationFn: createClientMaster,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientMaster"] });
      router.push("/dashboard/client-master");
    },
  });

  const { mutate: update, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateClientMaster,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientMaster"] });
      router.push("/dashboard/client-master");
    },
  });

  const onSubmit: SubmitHandler<ClientMasterFormFields> = async (values) => {
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
          <div className="flex text-xl font-bold">Client Master Form</div>
          <Separator className="mt-2" />
        </div>
        {/* Personal Information */}
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  Company Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">Tax ID</FormLabel>
                <FormControl>
                  <Input placeholder="Tax ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address Information */}
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  Street Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="Street Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">State</FormLabel>
                <FormControl>
                  <Input placeholder="State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold">
                  Zip Code
                </FormLabel>
                <FormControl>
                  <Input placeholder="Zip Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="isMailingList"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    className="cursor-pointer"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer text-xs font-semibold">
                    Add to mailing list
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button variant="destructive" className="mr-2 cursor-pointer" asChild>
            <Link href="/dashboard/client-master">Go Back</Link>
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
