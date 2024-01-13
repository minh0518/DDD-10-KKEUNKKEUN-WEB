'use client';

import { FieldValues, useForm } from 'react-hook-form';

import styles from './LoginForm.module.scss';

import Button from '@/app/_components/_elements/Button';

interface LoginformType {
  email: string;
  password: number;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<LoginformType>();

  const loginSubmit = (data: FieldValues) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className={styles.container}>
      {/* data가 사용자가 입력한 최종 데이터 */}
      <form className={styles.loginForm} onSubmit={handleSubmit((data) => loginSubmit(data))}>
        <div className={styles.loginInput}>
          <label htmlFor="email">이메일</label>
          <input
            className={styles.input}
            id="email"
            type="email"
            placeholder="이메일을 입력하세요"
            aria-invalid={isSubmitted ? (errors.email ? 'true' : 'false') : undefined}
            {...register('email', {
              required: '이메일은 필수 입력입니다.',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: '이메일 형식에 맞지 않습니다.',
              },
            })}
          />
        </div>
        {errors.email && (
          <small style={{ color: 'red' }} role="alert">
            {errors.email?.message}
          </small>
        )}
        <div className={styles.loginInput}>
          <label htmlFor="password">비밀번호</label>
          <input
            className={styles.input}
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            aria-invalid={isSubmitted ? (errors.password ? 'true' : 'false') : undefined}
            {...register('password', {
              required: '비밀번호는 필수 입력입니다.',
              minLength: {
                value: 8,
                message: '8자리 이상 입력하세요',
              },
            })}
          />
        </div>
        {errors.password && (
          <small style={{ color: 'red' }} role="alert">
            {errors.password?.message}
          </small>
        )}
        <Button
          _disabled={isSubmitting}
          _onClick={() => {}}
          _type="submit"
          content={'로그인'}
          _className={styles.submitButton}
        ></Button>
      </form>
    </div>
  );
}

export default LoginForm;
