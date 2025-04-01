import { EyeIcon, Loader } from 'lucide-react';
import { useState } from 'react';
import { EyeOffIcon } from 'lucide-react';
import { useHookFormMask } from 'use-mask-input';
import { FieldValues, useForm} from 'react-hook-form';

export default function Form() {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [address, setAddress] = useState({city: '', street: ''});
  const {handleSubmit, register, formState: { isSubmitting, errors }} = useForm();
  const registerWithMask = useHookFormMask(register);

  async function handleZipcodeBlur(e: React.FocusEvent<HTMLInputElement>) {

  const zipcode = e.target.value;
  const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${zipcode}`)

  if (res.ok) {
    const data = await res.json();
    setAddress({
      city: data.city,
      street: data.street,
    });
  }
}

  async function onSubmit(data: FieldValues) {
    console.log('form submitted');
    console.log(data);
    
    const res = await fetch('https://apis.codante.io/api/register-user/register', {method: 'POST', body: JSON.stringify(data)})
    const datas = await res.json();
    console.log(datas);
    
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name">Nome Completo</label>

        <input type="text" id="name" 
        {...register('name', {
            required: 'Nome é obrigatório',
            maxLength: {
              value: 255,
              message: 'O nome deve ter no máximo 255 caracteres'
            }
          })} />
        {/* Sugestão de exibição de erro de validação */}

        {errors.name && (
          <p className="text-xs text-red-400 mt-1">{errors.name?.message as string}</p>
        )}  
            
      </div>
      <div className="mb-4">
        <label htmlFor="email">E-mail</label>

        <input className="" type="email" id="email"
          {...register('email',
          {
            required: 'Email é obrigatório',
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'Email inválido'
            }
          }
          )}/>

          {errors.email && (
            <p className="text-xs text-red-400 mt-1">{errors.email?.message as string}</p>
          )}

      </div>
      <div className="mb-4">
        <label htmlFor="password">Senha</label>
        <div className="relative">

          <input type={isPasswordVisible ? 'text' : 'password'} id="password" 
            {...register('password', {
              required: 'Senha é obrigatório',
              minLength: {
                value: 6,
                message: 'A senha deve ter no mínimo 6 caracteres'
              }
            })}
            />

          {errors.password && (
            <p className="text-xs text-red-400 mt-1">{errors.password?.message as string}</p>
          )}

          <span className="absolute right-3 top-3">
            <button type='button' onClick={() => setIsPasswordVisible(!isPasswordVisible)}>

              {isPasswordVisible ? (
                <EyeIcon size={20} className="text-slate-600 cursor-pointer" />
              ) : (
                <EyeOffIcon
                      className="text-slate-600 cursor-pointer"
                      size={20}
                    />
              )}
            </button>
          </span>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="confirm-password">Confirmar Senha</label>

        <div className="relative">
          <input type={isPasswordVisible ? 'text' : 'password'} id="confirm-password" {...register('password_confirmation', {
            required: 'Confirmação de senha é obrigatório',
            minLength: {
              value: 6,
              message: 'A senha deve ter no mínimo 6 caracteres'
            }
          })}
          />
          {errors.password_confirmation && (
            <p className="text-xs text-red-400 mt-1">{errors.password_confirmation?.message as string}</p>
          )}

          <span className="absolute right-3 top-3">
          <button type='button' onClick={() => setIsPasswordVisible(!isPasswordVisible)}>

            {isPasswordVisible ? (
              <EyeIcon size={20} className="text-slate-600 cursor-pointer" />
            ) : (
              <EyeOffIcon
                    className="text-slate-600 cursor-pointer"
                    size={20}
                  />
            )}
            </button>
          </span>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="phone">Telefone Celular</label>

        <input type="text" id="phone" {...registerWithMask('phone', '(99) 99999-9999', {
          required: 'Telefone é obrigatório',
          pattern: {
            value: /^\(\d{2}\) \d{5}-\d{4}$/,
            message: 'Telefone inválido'
          },
        })}
        />

        {errors.phone && (
          <p className="text-xs text-red-400 mt-1">{errors.phone?.message as string}</p>
        )}

      </div>
      <div className="mb-4">
        <label htmlFor="cpf">CPF</label>
        <input type="text" id="cpf" {...registerWithMask('cpf', 'cpf', {
          required: 'CPF é obrigatório',
          pattern: {
            value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
            message: 'CPF inválido'
          }
        })}
        />

        {errors.cpf && (
          <p className="text-xs text-red-400 mt-1">{errors.cpf?.message as string}</p>
        )}

      </div>
      <div className="mb-4">
        <label htmlFor="cep">CEP</label>
        <input type="text" id="cep"
        {...registerWithMask('zipcode', '99999-999', {
          required: 'CEP é obrigatório',
          pattern: {
            value: /^\d{5}-\d{3}$/,
            message: 'CEP inválido'
          },
          onBlur: handleZipcodeBlur
        })}
        />

        {errors.zipcode && (
          <p className="text-xs text-red-400 mt-1">{errors.zipcode?.message as string}</p>
        )}

      </div>
      <div className="mb-4">
        <label htmlFor="address">Endereço</label>
        <input
          className="disabled:bg-slate-200"
          type="text"
          id="address"
          // disabled
          value={address.street}
          {...register('address', {
            required: 'Endereço é obrigatório',
            maxLength: {
              value: 255,
              message: 'Endereço deve ter no máximo 255 caracteres',
            }  
          })}
        />

        {errors.address && (
          <p className="text-xs text-red-400 mt-1">{errors.address?.message as string}</p>
        )}

      </div>

      <div className="mb-4">
        <label htmlFor="city">Cidade</label>
        <input
          className="disabled:bg-slate-200"
          type="text"
          id="city"
          disabled
          value={address.city}
        />
      </div>
      {/* terms and conditions input */}
      <div className="mb-4">
        <input type="checkbox" id="terms" className="mr-2 accent-slate-500" 
        {...register('terms', {
          required: 'Os termos e condições devem ser aceitos'
        })}
        />
        {errors.terms && (
          <p className="text-xs text-red-400 mt-1">{errors.terms?.message as string}</p>
        )}

        <label
          className="text-sm  font-light text-slate-500 mb-1 inline"
          htmlFor="terms"
        >
          Aceito os{' '}
          <span className="underline hover:text-slate-900 cursor-pointer">
            termos e condições
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-slate-500 font-semibold text-white w-full rounded-xl p-4 mt-10 hover:bg-slate-600 transition-colors disabled:bg-slate-300 flex items-center justify-center"
      >
        {isSubmitting ? <Loader className='animate-spin' /> : 'Cadastrar' }
        
      </button>
    </form>
  );
}
