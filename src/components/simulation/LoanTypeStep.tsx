import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LOAN_TYPES, LoanType } from '@/types/loan';
import { Building2, User } from 'lucide-react';

interface LoanTypeStepProps {
  selectedCategory: 'pf' | 'pj' | null;
  selectedLoanType: string;
  onCategorySelect: (category: 'pf' | 'pj') => void;
  onLoanTypeSelect: (loanType: string) => void;
  onNext: () => void;
}

const LoanTypeStep: React.FC<LoanTypeStepProps> = ({
  selectedCategory,
  selectedLoanType,
  onCategorySelect,
  onLoanTypeSelect,
  onNext,
}) => {
  const filteredLoanTypes = selectedCategory
    ? LOAN_TYPES.filter((loan) => loan.category === selectedCategory)
    : [];

  return (
    <div className="space-y-6">
      {!selectedCategory && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Tipo de Cliente</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => onCategorySelect('pf')}
            >
              <CardContent className="flex flex-col items-center p-6">
                <User className="h-12 w-12 text-primary mb-4" />
                <h4 className="font-semibold">Pessoa Física</h4>
                <p className="text-sm text-muted-foreground text-center">
                  Empréstimos para necessidades pessoais
                </p>
              </CardContent>
            </Card>
            <Card
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => onCategorySelect('pj')}
            >
              <CardContent className="flex flex-col items-center p-6">
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <h4 className="font-semibold">Pessoa Jurídica</h4>
                <p className="text-sm text-muted-foreground text-center">
                  Soluções de crédito empresarial
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {selectedCategory && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Escolha o Tipo de Crédito</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onCategorySelect(null as any);
                onLoanTypeSelect('');
              }}
            >
              Alterar Categoria
            </Button>
          </div>
          <div className="grid gap-4">
            {filteredLoanTypes.map((loan: LoanType) => (
              <Card
                key={loan.id}
                className={`cursor-pointer transition-colors ${
                  selectedLoanType === loan.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:border-primary'
                }`}
                onClick={() => onLoanTypeSelect(loan.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{loan.label}</CardTitle>
                
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground">
                    {loan.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {selectedLoanType && (
        <div className="flex justify-end">
          <Button onClick={onNext}>Continuar</Button>
        </div>
      )}
    </div>
  );
};

export default LoanTypeStep;