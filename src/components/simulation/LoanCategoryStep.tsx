import React, { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // FormControl foi removido da importação
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LOAN_CATEGORIES, LOAN_OPTIONS } from '@/lib/loanOptions';

interface LoanCategoryStepProps {
  form: UseFormReturn<any>;
}

export const LoanCategoryStep: React.FC<LoanCategoryStepProps> = ({ form }) => {
  const clientCategory = form.watch('clientCategory');

  useEffect(() => {
    form.setValue('loanType', '');
  }, [clientCategory, form]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="clientCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Para quem é o crédito?</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ''}>
              {/* FormControl foi REMOVIDO daqui */}
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(LOAN_CATEGORIES).map(([key, value]) => (
                  <SelectItem key={key} value={key}>{value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="loanType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de Crédito</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value || ''} 
              disabled={!clientCategory}
            >
              {/* FormControl foi REMOVIDO daqui */}
              <SelectTrigger>
                <SelectValue placeholder={!clientCategory ? "Escolha a categoria primeiro" : "Selecione o tipo..."} />
              </SelectTrigger>
              <SelectContent>
                {clientCategory && LOAN_OPTIONS[clientCategory as keyof typeof LOAN_OPTIONS]?.map(option => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};