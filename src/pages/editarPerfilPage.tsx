import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useProfileContext } from '../context/ProfileContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import api from "@/services/http/axios";
import { ArrowRight, Loader2, User, Home, Briefcase, ChevronLeft } from "lucide-react";
import { ProfileResponse } from '@/types';
import Header from '@/components/Header';

const EDUCATION_LEVELS = ["Fundamental Incompleto", "Fundamental Completo", "Médio Incompleto", "Médio Completo", "Superior Incompleto", "Superior Completo", "Pós-graduação", "Mestrado", "Doutorado"];
const MARITAL_STATUS = ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)", "União Estável"];
const OCCUPATIONS = ["Assalariado", "Autônomo", "Empresário", "Profissional Liberal", "Aposentado", "Pensionista", "Desempregado", "Estudante"];

// Schema: Todos os campos como .optional() e sem min(1)
const profileSchema = z.object({
  birthDate: z.string().optional(),
  gender: z.string().optional(),
  education: z.string().optional(),
  maritalStatus: z.string().optional(),
  motherName: z.string().optional(),
  cep: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  occupation: z.string().optional(),
  monthlyIncome: z.preprocess((val) => (val === "" || val === null ? 0 : Number(val)), z.number().optional()),
  data_admissao: z.string().optional(),
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
      birthDate: "", gender: "", education: "", maritalStatus: "", motherName: "",
      cep: "", street: "", number: "", complement: "", neighborhood: "",
      city: "", state: "", occupation: "", monthlyIncome: 0, data_admissao: "",
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
        const p = response.data;

const formatToInputDate = (dateString: string | null | undefined) => {
  if (!dateString) return "";

  try {

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    if (dateString.includes("T")) {
      return dateString.split("T")[0];
    }

    if (dateString.includes("/")) {
      const [day, month, year] = dateString.split("/");
      return `${year}-${month}-${day}`;
    }


    const d = new Date(dateString);
    if (!isNaN(d.getTime())) {
      return d.toISOString().split("T")[0];
    }

    return "";
  } catch {
    return "";
  }
};
console.log("DATA NASCIMENTO DA API:", p.data_nascimento);

        reset({
          
          birthDate: formatToInputDate(p.data_nascimento), 
          gender: p.genero || "",
          education: p.escolaridade || "",
          maritalStatus: p.estado_civil || "",
          motherName: p.nome_mae || "",
          cep: p.cep || "",
          street: p.logradouro || "",
          number: p.numero || "",
          complement: p.complemento || "",
          neighborhood: p.bairro || "",
          city: p.cidade || "",
          state: p.estado || "",
          occupation: p.profissao || "",
          monthlyIncome: Number(p.renda_mensal) || 0,
          data_admissao: formatToInputDate(p.data_admissao), 
        });
      } catch (error) {
        toast.error("Erro ao carregar dados.");
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
    try {
      const token = localStorage.getItem("token");
      const response = await api.put<ProfileResponse>("/api/perfil/me", {
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
        data_admissao: data.data_admissao,
        possui_restricao: false,
        possui_veiculo: false,
        possui_imovel: false,
      }, { headers: { Authorization: `Bearer ${token}` } });

      setProfile(response.data);
      toast.success("Perfil atualizado!");
      navigate('/minhas-simulacoes');
    } catch (error) {
      toast.error("Erro ao salvar.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC]">
      <Header />
      <div className="max-w-4xl mx-auto py-12 px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-500 hover:text-navy-dark transition-colors mb-6 group"
        >
          <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-navy-dark tracking-tighter">Configurações de Perfil</h1>
          <p className="text-gray-500 mt-2 font-light">Mantenha seus dados atualizados.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
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
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Nascimento</FormLabel>
                    <FormControl>
                      
                      <Input 
                        {...field} 
                        type="date" 
                        value={field.value || ""} 
                        className="h-12 rounded-xl" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
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

            {/* Seções de Endereço e Financeiro mantidas com campos opcionais */}
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-50 px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-bold text-navy-dark">Endereço</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8 grid md:grid-cols-6 gap-6">
                <FormField control={form.control} name="cep" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">CEP</FormLabel>
                  <FormControl><Input {...field} onBlur={(e) => handleCepBlur(e.target.value)} className="h-12 rounded-xl" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="street" render={({ field }) => (
                  <FormItem className="md:col-span-4"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Logradouro</FormLabel>
                  <FormControl><Input {...field} className="h-12 rounded-xl" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="number" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Número</FormLabel>
                  <FormControl><Input {...field} className="h-12 rounded-xl" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="complement" render={({ field }) => (
                  <FormItem className="md:col-span-4"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Complemento</FormLabel>
                  <FormControl><Input {...field} className="h-12 rounded-xl" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="neighborhood" render={({ field }) => (
                  <FormItem className="md:col-span-2"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Bairro</FormLabel>
                  <FormControl><Input {...field} className="h-12 rounded-xl" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem className="md:col-span-3"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Cidade</FormLabel>
                  <FormControl><Input {...field} className="h-12 rounded-xl" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="state" render={({ field }) => (
                  <FormItem className="md:col-span-1"><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">UF</FormLabel>
                  <FormControl><Input {...field} maxLength={2} className="h-12 rounded-xl" /></FormControl></FormItem>
                )} />
              </CardContent>
            </Card>

            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-50 px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-bold text-navy-dark">Vida Profissional</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8 grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="occupation" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Ocupação</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
                  <SelectContent className="rounded-xl">{OCCUPATIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></FormItem>
                )} />
                <FormField control={form.control} name="monthlyIncome" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Renda Mensal</FormLabel>
                  <FormControl><Input {...field} type="number" className="h-12 rounded-xl" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="data_admissao" render={({ field }) => (
                  <FormItem><FormLabel className="text-xs font-bold uppercase tracking-widest text-gray-400">Data de Admissão</FormLabel>
                  <FormControl><Input {...field} type="date" className="h-12 rounded-xl" /></FormControl></FormItem>
                )} />
              </CardContent>
            </Card>

            <div className="flex justify-center md:justify-end pt-6">
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto h-16 px-12 rounded-full bg-navy-dark hover:bg-primary text-white font-bold">
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ArrowRight className="mr-2 h-5 w-5" />}
                {isLoading ? 'SALVANDO...' : 'ATUALIZAR MEU PERFIL'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProfilePage;