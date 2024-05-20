"use client"

import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { passwordValidations } from "../../../utils"
import PasswordField from "../ui/PasswordField"
import { CircularProgress, Grid } from '@mui/material';
import { updatePassword } from "@/database/dbAuth"
import { useRouter } from "next/navigation"

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

    const result = await updatePassword("66456a3efe7539f0a015dbdf", data.currentPassword, data.newPassword)
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
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3 flex flex-col">
      <Grid container={true} spacing={2}>

        <Grid item xs={7} md={7} lg={7}>
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

        <Grid item xs={7} md={7} lg={7}>
          <PasswordField
            label="Nueva contraseña"
            register={register("newPassword", {
              required: "Este campo es requerido",
              validate: (value) => {
                if (passwordValidations.isPassword(value)) {
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

        <Grid item xs={7} md={7} lg={7}>
          <PasswordField
            label="Confirmar contraseña"
            register={register("confirmPassword", {
              required: "Este campo es requerido",
              validate: (value) => {
                if (passwordValidations.isPassword(value)) {
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
        <button style={{ height: '50px', width: '200px', fontSize: '20px', margin: '5% 50% 0% 5%' }}>
          {isLoading ? <CircularProgress size={40} color="inherit" /> : 'Cambiar contraseña'}
        </button>
        {error && <div style={{ margin: '5% 50% 0% 5%' }}>{error}</div>}
      </div>
    </form>
  )
}
