function tokenize(line) {
  return line.match(/"[^"]*"|\S+/g) || []
}

function compile(code) {
  const lines = code.split("\n")
  const output = []

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim()

    if (!line) continue

    // comments
    if (line.startsWith("#")) continue

    const parts = tokenize(line)

    const cmd = parts[0]
    
    // VARIABLES
    if (cmd === "store") {
      const name = parts[1]
      const value = parts[3]
      const mode = parts[4]

      if (mode === undefined) {
        output.push(`scoreboard players set ${name} gbmcf_vars ${value}`)
      } else if (mode === "add") {
        output.push(`scoreboard players add ${name} gbmcf_vars ${value}`)
      } else if (mode === "sub") {
        output.push(`scoreboard players remove ${name} gbmcf_vars ${value}`)
      } else if (mode === "del") {
        output.push(`scoreboard players reset ${name} gbmcf_vars`)
      }

    }
      // CREATE/DELETE VARIABLE TABLE
      else if (cmd === "vars") {
  const toggle = parts[1]

  if (toggle === "create") {
    output.push(
      `scoreboard objectives add gbmcf_vars dummy`
    )
  }

  else if (toggle === "delete") {
    output.push(
      `scoreboard objectives remove gbmcf_vars`
    )
  }
}
      // ANNJSON
    else if (cmd === "annjson") {
    const target = parts[1]

      const json = parts.slice(2).join(" ")

      output.push(`tellraw ${target} ${json}`)
}
      // place
      else if (cmd === "place") {
        const x = parts[1]
        const y = parts[2]
        const z = parts[3]
        const block = parts[4]

        if (parts.length < 5) {
          output.push(`SYNTAX ERROR: place`)
          continue
      }
          output.push(`setblock ${x} ${y} ${z} ${block}`)
      }
        // destroy
        else if (cmd === "destroy") {
          const x = parts[1]
          const y = parts[2]
          const z = parts[3]

          if (parts.length < 4) {
            output.push(`SYNTAX ERROR: destroy`)
            continue
          }
            output.push(`setblock ${x} ${y} ${z} air`)
        }
          
    // ANNOUNCE
    else if (cmd === "announce") {
      const msg = parts
        .slice(1)
        .join(" ")
        .replace(/^"|"$/g, "")

      output.push(`say ${msg}`)
    }

    // MOVE
    else if (cmd === "move") {
      const target = parts[1]
      const x = parts[2]
      const y = parts[3]
      const z = parts[4]

      if (parts.length < 5) {
  output.push("SYNTAX ERROR: move")
  continue
}

      output.push(`tp ${target} ${x} ${y} ${z}`)
    }

    // EFFECT CLEAR
    else if (
      cmd === "effect" &&
      parts[2] === "clear"
    ) {
      const target = parts[1]

      output.push(`effect clear ${target}`)
    }

    // EFFECT ADD
    else if (
      cmd === "effect" &&
      parts[2] === "add"
    ) {
      const target = parts[1]
      const effect = parts[3]

      const duration = parts[4]
      const amplifier = parts[5]
      let particles = parts[6]

      if (particles === undefined) {
        particles = "false"
      }

      output.push(
        `effect give ${target} ${effect} ${duration} ${amplifier} ${particles}`
      )
    }
      // if
else if (cmd === "if") {
  if (parts.length < 6) {
    output.push(`SYNTAX ERROR: if`)
    continue
  }

  const varname = parts[1]
  const operator = parts[2]
  const comp = parts[3]

  const mccmd = parts.slice(5).join(" ")

  let range = comp

  if (operator === ">=") range = `${comp}..`
  else if (operator === "<=") range = `..${comp}`
  else if (operator === "==" || operator === "=") range = comp

  if (!mccmd) {
    output.push(`SYNTAX ERROR: if`)
    continue
  }

  output.push(
    `execute if score ${varname} gbmcf_vars matches ${range} run ${mccmd}`
  )
}
        else if (cmd === "raw") {
  output.push(
    parts.slice(1).join(" ")
  )
}
          // moveblock
  else if (cmd === "moveblock") {
  const x = parts[1]
  const y = parts[2]
  const z = parts[3]
  const dx = parts[4]
  const dy = parts[5]
  const dz = parts[6]

  if (parts.length < 7) {
    output.push(`SYNTAX ERROR: moveblock`)
  } else {
    output.push(`clone ${x} ${y} ${z} ${x} ${y} ${z} ${dx} ${dy} ${dz} replace`)
    output.push(`setblock ${x} ${y} ${z} air`)
  }
}
      else { // error logger
        output.push(
          `SYNTAX ERROR: ${line}`
        )
      }
  }
  return output.join("\n")
}

function runCompile() {
  const code =
    document.getElementById("input").value

  const compiled = compile(code)

  document.getElementById("output").textContent =
    compiled
}
  function getCode() {
  const copy =
    document.getElementById("output").textContent

  if (copy === "" || copy === "Type code above for an output.") {
    alert("No code compiled!")
  }
  else {
    navigator.clipboard.writeText(copy)

    alert("Copied!")
  }
}
  async function openFile() {
    const fileinfo = document.getElementById("fileNameDisplay")
  const [fileHandle] = await window.showOpenFilePicker({
    types: [{
      description: "GBMCF Files",
      accept: {
        "text/plain": [".gbmcf"]
      }
    }]
  })

  const file = await fileHandle.getFile()
  const text = await file.text()
    const fileName = file.name
    fileinfo.textContent = `Opened ${fileName}`
    setTimeout(() => {
      fileinfo.textContent = ""
    }, 1500)

  document.getElementById("input").value = text
}

async function saveFile() {
  const text =
    document.getElementById("input").value

  const fileHandle =
    await window.showSaveFilePicker({
      suggestedName: "gbmcf-generated.gbmcf",
      types: [{
        description: "GBMCF Files",
        accept: {
          "text/plain": [".gbmcf"]
        }
      }]
    })

  const writable =
    await fileHandle.createWritable()

  await writable.write(text)
  await writable.close()
}
async function saveMcf() {
  const code =
    document.getElementById("input").value
  const compiled = compile(code)
  const text =
    document.getElementById("output").textContent

  document.getElementById("output").textContent =
    compiled
  
  const fileHandle =
    await window.showSaveFilePicker({
      suggestedName: "gbmcf-generated.mcfunction",
      types: [{
        description: "MCfunction Files",
        accept: {
          "text/plain": [".mcfunction"]
        }
      }]
    })

  const writable =
    await fileHandle.createWritable()

  await writable.write(text)
  await writable.close()
}
  window.runCompile = runCompile
  window.getCode = getCode
window.openFile = openFile
window.saveFile = saveFile
window.saveMcf = saveMcf
