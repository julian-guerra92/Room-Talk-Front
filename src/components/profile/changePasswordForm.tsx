"use client"

import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { passwordValidations } from "../../utils"
import PasswordField from "./PasswordField"
import { Button, CircularProgress, Grid, Typography } from '@mui/material';
import { updatePassword } from "@/database/dbAuth"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/store"

type FormInputs = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>()
  const newPassword = watch("newPassword")
  const currentPassword = watch("currentPassword")

  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false })
  const session = useUserStore((state) => state.session);

  const handleClickShowPassword = (field: "current" | "new" | "confirm") => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] })
  }

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const router = useRouter()

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {

    setError("");
    setIsLoading(true);

    const result = await updatePassword(session!.id, data.currentPassword, data.newPassword)
    if (!result) {
      setError("La contraseña actual es incorrecta. Por favor, inténtalo de nuevo.");
      setIsLoading(false);
    }
    if (result) {
      alert("Contraseña cambiada exitosamente");
      router.push('/');
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3 flex flex-col" style={{ width: '50%' }}>
      <Grid container={true} spacing={2}>

        <Grid item xs={12}>
          <PasswordField
            label="Contraseña actual"
            register={register("currentPassword", {
              required: "Este campo es requerido",
            })}
            errors={errors.currentPassword}
            showPassword={showPassword.current}
            handleClickShowPassword={() => handleClickShowPassword("current")}
            handleMouseDownPassword={handleMouseDownPassword}
          />
        </Grid>

        <Grid item xs={12}>
          <PasswordField
            label="Nueva contraseña"
            register={register("newPassword", {
              required: "Este campo es requerido",
              validate: (value) => {
                if (!passwordValidations.isPassword(value)) {
                  return "La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial, y su extensión debe ser entre 8 y 25 caracteres."
                }
                if (value === currentPassword) {
                  return "La nueva contraseña debe ser diferente de la contraseña actual"
                }
                return true
              },
            })}
            errors={errors.newPassword}
            showPassword={showPassword.new}
            handleClickShowPassword={() => handleClickShowPassword("new")}
            handleMouseDownPassword={handleMouseDownPassword}
          />
        </Grid>

        <Grid item xs={12}>
          <PasswordField
            label="Confirmar contraseña"
            register={register("confirmPassword", {
              required: "Este campo es requerido",
              validate: (value) => {
                if (!passwordValidations.isPassword(value)) {
                  return "La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial, y su extensión debe ser entre 8 y 25 caracteres."
                }
                if (value !== newPassword) {
                  return "Las contraseñas no coinciden"
                }
                if (value === currentPassword) {
                  return "La nueva contraseña debe ser diferente de la contraseña actual"
                }
                return true
              },
            })}
            errors={errors.confirmPassword}
            showPassword={showPassword.confirm}
            handleClickShowPassword={() => handleClickShowPassword("confirm")}
            handleMouseDownPassword={handleMouseDownPassword}
          />
        </Grid>
      </Grid>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Button
          color="secondary"
          variant='contained'
          size='large'
          disabled={isLoading}
          type="submit"
          sx={{ width: '100%', fontSize: '20px', mt: 3, mb: 3 }}
        >
          {
            isLoading
              ? (
                <CircularProgress color='inherit' size={25} />
              )
              : 'Cambiar contraseña'
          }
        </Button>
        {error &&
          <Typography variant='body1' color='error' style={{ maxWidth: '450px', marginBottom: '10px' }}>
            {error}
          </Typography>
        }
      </div>
    </form>
  )
}
