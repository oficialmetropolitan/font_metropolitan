// src/pages/EditProfilePage.tsx (CORRIGIDO)
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useProfileContext } from '../context/ProfileContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import api from "@/services/http/axios";
import { ArrowRight, Loader2, User, Home, Briefcase } from "lucide-react";
import { ProfileResponse } from '@/types';
import Header from '@/components/Header';

const EDUCATION_LEVELS = ["Fundamental Incompleto", "Fundamental Completo", "Médio Incompleto", "Médio Completo", "Superior Incompleto", "Superior Completo", "Pós-graduação", "Mestrado", "Doutorado"];
const MARITAL_STATUS = ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)", "União Estável"];
const OCCUPATIONS = ["Assalariado", "Autônomo", "Empresário", "Profissional Liberal", "Aposentado", "Pensionista", "Desempregado", "Estudante"];

// Schema de Validação (REMOVIDO OS CHECKBOXES PARA NÃO TRAVAR)
const profileSchema = z.object({
  birthDate: z.string().min(1, "Data de nascimento obrigatória"),
  gender: z.string().min(1, "Gênero obrigatório"),
  education: z.string().min(1, "Grau de instrução obrigatório"),
  maritalStatus: z.string().min(1, "Estado civil obrigatório"),
  motherName: z.string().min(2, "Nome da mãe obrigatório"),
  cep: z.string().min(8, "CEP inválido").max(9, "CEP inválido"),
  street: z.string().min(1, "Logradouro obrigatório"),
  number: z.string().min(1, "Número obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  city: z.string().min(1, "Cidade obrigatória"),
  state: z.string().min(1, "Estado obrigatório"),
  occupation: z.string().min(1, "Ocupação obrigatória"),
  monthlyIncome: z.preprocess((val) => Number(val), z.number().min(0, "Renda mensal obrigatória")),
});

type ProfileForm = z.infer<typeof profileSchema>;

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { setProfile } = useProfileContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isCepLoading, setIsCepLoading] = React.useState(false);

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      birthDate: "",
      gender: "",
      education: "",
      maritalStatus: "",
      motherName: "",
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      occupation: "",
      monthlyIncome: 0,
    },
  });

  const { reset } = form;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate('/login');

        const response = await api.get<ProfileResponse>("/api/perfil/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profile = response.data;
        
        // Preenche o formulário com os dados do banco
        reset({
          birthDate: profile.data_nascimento || "",
          gender: profile.genero || "",
          education: profile.escolaridade || "",
          maritalStatus: profile.estado_civil || "",
          motherName: profile.nome_mae || "",
          cep: profile.cep || "",
          street: profile.logradouro || "",
          number: profile.numero || "",
          complement: profile.complemento || "",
          neighborhood: profile.bairro || "",
          city: profile.cidade || "",
          state: profile.estado || "",
          occupation: profile.profissao || "",
          monthlyIncome: Number(profile.renda_mensal) || 0,
        });

      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        toast.error("Não foi possível carregar os dados.");
      }
    };

    fetchProfile();
  }, [reset, navigate]);

  const handleCepBlur = async (cepValue: string) => {
    const cep = cepValue.replace(/\D/g, '');
    if (cep.length !== 8) return;
    setIsCepLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        form.setValue("street", data.logradouro);
        form.setValue("neighborhood", data.bairro);
        form.setValue("city", data.localidade);
        form.setValue("state", data.uf);
      }
    } finally {
      setIsCepLoading(false);
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true);

    const profilePayload = {
      data_nascimento: data.birthDate,
      genero: data.gender,
      escolaridade: data.education,
      estado_civil: data.maritalStatus,
      nome_mae: data.motherName,
      cep: data.cep,
      logradouro: data.street,
      numero: data.number,
      complemento: data.complement || '',
      bairro: data.neighborhood,
      cidade: data.city,
      estado: data.state,
      profissao: data.occupation,
      renda_mensal: data.monthlyIncome,
      // Fixamos false para os campos removidos
      possui_restricao: false,
      possui_veiculo: false,
      possui_imovel: false,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await api.put<ProfileResponse>("/api/perfil/me", profilePayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(response.data);
      toast.success("Perfil atualizado com sucesso!");
      navigate('/minhas-simulacoes');
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Erro ao salvar alterações.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Editar Perfil</h1>
          <p className="text-muted-foreground">Atualize seus dados abaixo.</p>
        </div>
        <Card className="border-2">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><User className="h-5 w-5 text-primary"/> Dados Pessoais</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="birthDate" render={({ field }) => (<FormItem><FormLabel>Data de Nascimento</FormLabel><FormControl><Input {...field} type="date" /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="gender" render={({ field }) => (<FormItem><FormLabel>Gênero</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl><SelectContent><SelectItem value="masculino">Masculino</SelectItem><SelectItem value="feminino">Feminino</SelectItem><SelectItem value="outro">Outro</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="education" render={({ field }) => (<FormItem><FormLabel>Grau de Instrução</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl><SelectContent>{EDUCATION_LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="maritalStatus" render={({ field }) => (<FormItem><FormLabel>Estado Civil</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl><SelectContent>{MARITAL_STATUS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="motherName" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Nome Completo da Mãe</FormLabel><FormControl><Input {...field} placeholder="Nome da mãe" /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><Home className="h-5 w-5 text-primary"/> Endereço</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField control={form.control} name="cep" render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input {...field} maxLength={9} onBlur={(e) => { field.onBlur(); handleCepBlur(e.target.value); }} />
                            {isCepLoading && <Loader2 className="absolute right-2 top-2 h-5 w-5 animate-spin text-muted-foreground" />}
                          </div>
                        </FormControl><FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="street" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Logradouro</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="number" render={({ field }) => (<FormItem><FormLabel>Número</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="complement" render={({ field }) => (<FormItem><FormLabel>Complemento</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="neighborhood" render={({ field }) => (<FormItem><FormLabel>Bairro</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="city" render={({ field }) => (<FormItem><FormLabel>Cidade</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="state" render={({ field }) => (<FormItem><FormLabel>Estado (UF)</FormLabel><FormControl><Input {...field} maxLength={2}/></FormControl><FormMessage /></FormItem>)} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-4"><Briefcase className="h-5 w-5 text-primary"/> Dados Financeiros</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="occupation" render={({ field }) => (<FormItem><FormLabel>Ocupação</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl><SelectContent>{OCCUPATIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="monthlyIncome" render={({ field }) => (<FormItem><FormLabel>Renda Mensal (R$)</FormLabel><FormControl><Input {...field} type="number" /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EditProfilePage;