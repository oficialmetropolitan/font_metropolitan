// src/pages/ProfilePage.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useProfileContext } from '../context/ProfileContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import api from "@/services/http/axios";
import { ArrowRight, Loader2, User, Home, Briefcase, ChevronLeft } from "lucide-react";
import { ProfileResponse } from '@/types';
import Header from '@/components/Header';

const EDUCATION_LEVELS = ["Fundamental Incompleto", "Fundamental Completo", "Médio Incompleto", "Médio Completo", "Superior Incompleto", "Superior Completo", "Pós-graduação", "Mestrado", "Doutorado"];
const MARITAL_STATUS = ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)", "União Estável"];
const OCCUPATIONS = ["Assalariado", "Autônomo", "Empresário", "Profissional Liberal", "Aposentado", "Pensionista", "Desempregado", "Estudante"];

// Schema de Validação (REMOVIDO OS CHECKBOXES PARA NÃO TRAVAR O ENVIO)
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
  dataAdmissao: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

const ProfilePage = () => {
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
      dataAdmissao: "",
    },
  });

  const { reset } = form;

  // Carregar dados iniciais
  React.useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await api.get<ProfileResponse>("/api/perfil/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const profileData = response.data;
        reset({
          birthDate: profileData.data_nascimento || "",
          gender: profileData.genero || "",
          education: profileData.escolaridade || "",
          maritalStatus: profileData.estado_civil || "",
          motherName: profileData.nome_mae || "",
          cep: profileData.cep || "",
          street: profileData.logradouro || "",
          number: profileData.numero || "",
          complement: profileData.complemento || "",
          neighborhood: profileData.bairro || "",
          city: profileData.cidade || "",
          state: profileData.estado || "",
          occupation: profileData.profissao || "",
          monthlyIncome: Number(profileData.renda_mensal) || 0,
          dataAdmissao: profileData.data_admissao || "",
        });
      } catch (error) {
        if (error.response?.status !== 404) {
          console.error("Erro ao carregar perfil:", error);
        }
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
        form.setFocus("number");
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
      data_admissao: data.dataAdmissao || null,
      // Como removemos do formulário, enviamos 'false' por padrão para não quebrar o banco
      possui_veiculo: false,
      possui_imovel: false,
      possui_restricao: false, 
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate('/login');

      const response = await api.put<ProfileResponse>("/api/perfil/me", profilePayload, {
         headers: { Authorization: `Bearer ${token}` }
      });

      setProfile(response.data);
      toast.success("Perfil salvo com sucesso!");
      navigate('/minhas-simulacoes'); 
    } catch (error) {
      toast.error(error.response?.data?.detail || "Erro ao salvar perfil.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <div className="min-h-screen bg-[#FBFBFC]">
      <Header />
      <div className="max-w-4xl mx-auto py-12 px-4">
        {/* Header de Navegação */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-500 hover:text-navy-dark transition-colors mb-6 group"
        >
          <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-navy-dark tracking-tighter">Configurações de Perfil</h1>
          <p className="text-gray-500 mt-2 font-light">Mantenha seus dados atualizados para melhores condições de crédito.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Seção: Dados Pessoais */}
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-50 px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-navy-dark">Dados Pessoais</CardTitle>
                    <CardDescription className="text-xs">Informações básicas de identificação</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="birthDate" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Nascimento</FormLabel>
                  <FormControl><Input {...field} type="date" className="h-12 rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="gender" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Gênero</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                  <SelectContent className="rounded-xl"><SelectItem value="masculino">Masculino</SelectItem><SelectItem value="feminino">Feminino</SelectItem><SelectItem value="outro">Outro</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="education" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Escolaridade</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                  <SelectContent className="rounded-xl">{EDUCATION_LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="maritalStatus" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Estado Civil</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                  <SelectContent className="rounded-xl">{MARITAL_STATUS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="motherName" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Nome da Mãe</FormLabel>
                  <FormControl><Input {...field} placeholder="Nome completo" className="h-12 rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
              </CardContent>
            </Card>

            {/* Seção: Endereço */}
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-50 px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-navy-dark">Endereço de Residência</CardTitle>
                    <CardDescription className="text-xs">Onde você mora atualmente</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-6 gap-6">
                  <FormField control={form.control} name="cep" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">CEP</FormLabel>
                    <FormControl><div className="relative">
                      <Input {...field} maxLength={9} onBlur={(e) => { field.onBlur(); handleCepBlur(e.target.value); }} className="h-12 rounded-xl pr-10" />
                      {isCepLoading && <Loader2 className="absolute right-3 top-3.5 h-5 w-5 animate-spin text-primary" />}
                    </div></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="street" render={({ field }) => (
                    <FormItem className="md:col-span-4"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Logradouro</FormLabel>
                    <FormControl><Input {...field} className="h-12 rounded-xl" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="number" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Número</FormLabel>
                    <FormControl><Input {...field} className="h-12 rounded-xl" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="complement" render={({ field }) => (
                    <FormItem className="md:col-span-4"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Complemento</FormLabel>
                    <FormControl><Input {...field} className="h-12 rounded-xl" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="neighborhood" render={({ field }) => (
                    <FormItem className="md:col-span-2"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Bairro</FormLabel>
                    <FormControl><Input {...field} className="h-12 rounded-xl" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem className="md:col-span-3"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Cidade</FormLabel>
                    <FormControl><Input {...field} className="h-12 rounded-xl" /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="state" render={({ field }) => (
                    <FormItem className="md:col-span-1"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">UF</FormLabel>
                    <FormControl><Input {...field} maxLength={2} className="h-12 rounded-xl uppercase text-center" /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
              </CardContent>
            </Card>

            {/* Seção: Financeiro */}
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-50 px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-navy-dark">Vida Profissional</CardTitle>
                    <CardDescription className="text-xs">Dados sobre ocupação e renda</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="occupation" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Ocupação Atual</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                  <SelectContent className="rounded-xl">{OCCUPATIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="monthlyIncome" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Renda Mensal Estimada</FormLabel>
                  <FormControl><div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-400 text-sm italic">R$</span>
                    <Input {...field} type="number" className="h-12 rounded-xl pl-10" />
                  </div></FormControl><FormMessage /></FormItem>
                )} />
   <FormField 
  control={form.control} 
  name="dataAdmissao" 
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">
        Data de Admissão *
      </FormLabel>
      <FormControl>
        <Input 
          {...field} 
          type="date" 
          className="h-12 rounded-xl border-gray-200 focus:border-primary focus:ring-primary/5 bg-white transition-all"
        />
      </FormControl>
      <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
    </FormItem>
  )} 
/>
                
              </CardContent>
            </Card>

            <div className="flex justify-center md:justify-end pt-6">
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full md:w-auto h-16 px-12 rounded-full bg-navy-dark hover:bg-primary text-white font-bold tracking-widest transition-all shadow-xl shadow-navy-dark/20"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <ArrowRight className="mr-2 h-5 w-5" />
                )}
                {isLoading ? 'SALVANDO...' : 'ATUALIZAR MEU PERFIL'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfilePage;